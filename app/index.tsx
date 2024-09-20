import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { useFocusEffect } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchEvents } from "@/stateManagement/features/eventsSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import EventItem from "./components/EventItem";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = () => {
  const { error, events, loading } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  const timer = useRef<null | NodeJS.Timeout>();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchEvents());

      fetchDataon60Sec();

      return () => removeDataon60Sec();
    }, [])
  );

  const fetchDataon60Sec = () => {
    timer.current = setInterval(() => {
      dispatch(fetchEvents());
    }, 5000);
  };

  const removeDataon60Sec = () => {
    if (timer) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  if (loading) {
    <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventItem record={item} />}
        ItemSeparatorComponent={<View style={{ marginVertical: 8 }} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});
