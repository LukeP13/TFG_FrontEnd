import { Picker } from "@react-native-community/picker";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import { colors } from "react-native-elements";
import strings from "../../../res/strings";
import {
  convertMiliseconds,
  formatTime,
} from "../../library/functions/convertMS";
import { range } from "../../library/functions/utilities";
import images from "../../../res/images";
import mycolors from "../../../res/colors";

const TIME = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
  MONTH: 1000 * 60 * 60 * 24 * 30,
  YEAR: 1000 * 60 * 60 * 24 * 30 * 12,
};

const RevisionEdit = ({ revision, onChange, onDelete = null }) => {
  const units = strings.km;
  const { name, distance, time } = revision;

  const timeConverted = convertMiliseconds(time || 0);

  function setTime({
    years = timeConverted.years,
    months = timeConverted.months,
    days = timeConverted.days,
  }) {
    const t =
      parseInt(years) * TIME.YEAR +
      parseInt(months) * TIME.MONTH +
      parseInt(days) * TIME.DAY;
    onChange({
      time: t,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.nameView}>
        <TextInput
          style={styles.nameText}
          value={name}
          onChangeText={(name) => onChange({ name })}
        />
        <TouchableOpacity onPress={onDelete}>
          <Image source={images.closeImage} style={styles.closeImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.viewContainer}>
        <Picker
          style={styles.distancePicker}
          selectedValue={distance}
          onValueChange={(distance) => onChange({ distance })}
        >
          {range(0, 100000, 500).map((item, i) => (
            <Picker.Item key={i} label={`${item}`} value={item} />
          ))}
        </Picker>
        <Text>{units}</Text>
      </View>

      <View style={styles.viewContainer}>
        <View style={styles.timeView}>
          <Text style={styles.timeInput}>{timeConverted.years}</Text>
          <Picker
            style={styles.picker}
            onValueChange={(years) => setTime({ years })}
            selectedValue={timeConverted.years}
          >
            {range(0, 9).map((i) => (
              <Picker.Item key={i} value={i} label={`${i}`} />
            ))}
          </Picker>
          <Text style={styles.timeLabel}>{strings.years},</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.timeInput}>{timeConverted.months}</Text>
          <Picker
            style={styles.picker}
            onValueChange={(months) => setTime({ months })}
            selectedValue={timeConverted.months}
          >
            {range(0, 11).map((i) => (
              <Picker.Item key={i} value={i} label={`${i}`} />
            ))}
          </Picker>
          <Text style={styles.timeLabel}>{strings.months},</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.timeInput}>{timeConverted.days}</Text>
          <Picker
            style={styles.picker}
            onValueChange={(days) => setTime({ days })}
            selectedValue={timeConverted.days}
          >
            {range(0, 29).map((i) => (
              <Picker.Item key={i} value={i} label={`${i}`} />
            ))}
          </Picker>
          <Text style={styles.timeLabel}>{strings.days}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    flexDirection: "column",
    borderWidth: 2.5,
    borderColor: mycolors.secondaryColor,
    borderRadius: 3,
  },
  nameView: {
    borderBottomWidth: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: mycolors.secondaryColor,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 17,
    flex: 1,
    color: colors.white,
  },
  distanceView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginVertical: 5,
  },
  distancePicker: {
    height: 20,
    width: 125,
    padding: 0,
    borderBottomWidth: 1,
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    padding: 10,
  },
  timeView: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 2,
    marginRight: 10,
  },
  timeInput: {
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    textAlign: "center",
  },
  picker: {
    width: 35,
    height: 20,
  },
  timeLabel: {
    marginLeft: -10,
    fontSize: 12,
  },
  closeImage: {
    width: 20,
    height: 20,
  },
});

export default RevisionEdit;
