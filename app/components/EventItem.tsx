import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import Card from "./Card";
import { useRouter } from "expo-router";
import { setEventDetails } from "@/stateManagement/features/eventsSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

interface IEventItem {
  record: any;
}

const EventItem: React.FC<IEventItem> = ({ record }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const eventListPress = () => {
    dispatch(setEventDetails(record));
    router.push({ pathname: "/eventDetails", params: record });
  };
  return (
    <Card onPress={eventListPress}>
      <View style={styles.container}>
        {/* Actor Information */}
        <View style={styles.actorContainer}>
          <Image
            source={{ uri: record.actor.avatar_url }}
            style={styles.avatar}
          />
          <Text style={styles.actorName}>{record.actor.login}</Text>
        </View>

        {/* Event and Repo Information */}
        <View style={styles.content}>
          <Text style={styles.eventType}>{record.type}</Text>
          <Text style={styles.repoName}>Repo: {record.repo.name}</Text>
        </View>
      </View>
    </Card>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  actorContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  actorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  eventType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
  },
  repoName: {
    fontSize: 14,
    marginTop: 5,
    color: "#333",
  },
  commitMessage: {
    fontSize: 12,
    marginTop: 5,
    fontStyle: "italic",
    color: "#555",
  },
});
