import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { useAppSelector } from "@/hooks/reduxHooks";
import LoadingSpinner from "./components/LoadingSpinner";

// Define types for eventDetail structure
type EventDetail = {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id?: number;
    commits?: Array<{
      sha: string;
      author: {
        email: string;
        name: string;
      };
      message: string;
      distinct: boolean;
      url: string;
    }>;
  };
  created_at: string;
};

const EventDetails: React.FC = () => {
  const { error, eventDetail, loading } = useAppSelector(
    (state: {
      events: { error: string; eventDetail: EventDetail; loading: boolean };
    }) => state.events
  );

  console.log(eventDetail, "hellooooo");

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!eventDetail?.id) {
    return <Text>No Event Details Available</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Actor Information */}
      <View style={styles.actorContainer}>
        <Image
          source={{ uri: eventDetail.actor.avatar_url }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.actorName}>{eventDetail.actor.login}</Text>
          <Text style={styles.eventType}>{eventDetail.type}</Text>
        </View>
      </View>

      {/* Repository Information */}
      <View style={styles.repoContainer}>
        <Text style={styles.sectionTitle}>Repository:</Text>
        <Text style={styles.repoName}>{eventDetail.repo.name}</Text>
        <Text
          style={styles.repoUrl}
          onPress={() => Linking.openURL(eventDetail.repo.url)}
        >
          View Repository
        </Text>
      </View>

      {/* Commit Information */}
      {eventDetail?.payload?.commits && (
        <View style={styles.commitContainer}>
          <Text style={styles.sectionTitle}>Latest Commit:</Text>
          <Text style={styles.commitMessage}>
            {eventDetail.payload.commits[0].message}
          </Text>
          <Text style={styles.commitAuthor}>
            Author: {eventDetail.payload.commits[0].author.name}
          </Text>
          <Text
            style={styles.commitSha}
            onPress={() => Linking.openURL(eventDetail.payload.commits[0].url)}
          >
            Commit: {eventDetail.payload.commits[0].sha.slice(0, 7)}...
          </Text>
        </View>
      )}

      {/* Event Metadata */}
      <View style={styles.metadataContainer}>
        <Text style={styles.sectionTitle}>Event Details:</Text>
        <Text style={styles.metadata}>
          Created At: {new Date(eventDetail.created_at).toLocaleString()}
        </Text>
        {eventDetail?.payload?.push_id && (
          <Text style={styles.metadata}>
            Push ID: {eventDetail.payload.push_id}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    flexGrow: 1,
  },
  actorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  actorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  eventType: {
    fontSize: 14,
    color: "#007bff",
  },
  repoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  repoName: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  repoUrl: {
    fontSize: 14,
    color: "#007bff",
    textDecorationLine: "underline",
  },
  commitContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  commitMessage: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    fontStyle: "italic",
  },
  commitAuthor: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  commitSha: {
    fontSize: 14,
    color: "#007bff",
    textDecorationLine: "underline",
  },
  metadataContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  metadata: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
});
