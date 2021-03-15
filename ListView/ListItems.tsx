import React, { CSSProperties } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, ImageSourcePropType, GestureResponderEvent, ViewStyle, TextStyle } from "react-native";

type ListItemProps = {
  listItemStyle:Element,
  onPress:(event: GestureResponderEvent) => void,
  leftElement:Element,
  text:string,
  textStyle:TextStyle,
  rightElement:ImageSourcePropType,
  rightElementWrapperStyle?:ViewStyle,
}

export default function ListItem(props:ListItemProps) {
  const {
    listItemStyle,
    onPress,
    leftElement,
    text,
    textStyle,
    rightElement,
  } = props;
  return (
    <TouchableOpacity
      style={listItemStyle || styles.container}
      activeOpacity={0.5}
      onPress={onPress}
    >
      {leftElement}
      <Text style={textStyle || styles.text}>{text}</Text>
      {rightElement}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center"
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
    marginLeft: 10,
    marginRight: 10
  },
});
