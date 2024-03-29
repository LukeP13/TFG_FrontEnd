import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "react-native-elements";
import strings from "../../../../res/strings";
import globalStyles from "../../../styles/styles";
import { range } from "../../functions/utilities";
import RevisionItem from "./revisionItem";

const BikeItem = ({ item, onPress }) => {
  const { _id, name, incomingRevisions } = item;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{name || _id}</Text>
        <Text style={styles.otherText}>{strings.nextInspect}</Text>
      </View>
      <View style={styles.contentView}>
        {incomingRevisions.length > 0 ? (
          range(0, Math.min(incomingRevisions.length - 1, 3)).map((i) => {
            return (
              <RevisionItem
                key={incomingRevisions[i]._id}
                item={incomingRevisions[i]}
              />
            );
          })
        ) : (
          <Text style={styles.noInspections}>{strings.noInspections}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "flex-start",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 3,
    elevation: 5,
  },
  titleView: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    flex: 1,
    justifyContent: "space-between",

    flexDirection: "row",
  },
  titleText: {
    fontWeight: "bold",
  },
  otherText: {
    color: colors.grey1,
    ...globalStyles.italic,
  },
  contentView: {
    borderTopWidth: 1,
    paddingTop: 5,
  },
  noInspections: {
    ...globalStyles.italic,
    paddingHorizontal: 5,
    color: colors.grey1,
  },
});

export default BikeItem;
