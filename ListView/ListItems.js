import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

export default ListItem = props => {
  const {
    listItemStyle,
    onPress,
    leftImageStyle,
    leftImage,
    text,
    textStyle,
    rightImage,
    rightImageStyle,
    rightImageWrapperStyle
  } = props;
  return (
    <TouchableOpacity
      style={listItemStyle || styles.container}
      activeOpacity={0.5}
      onPress={onPress}
    >
      {leftImage && (
        <Image
          style={leftImageStyle || { width: 20, height: 20 }}
          source={leftImage}
          resizeMode="contain"
        />
      )}
      <Text style={textStyle || styles.text}>{text}</Text>
      {rightImage && (
        <View style={rightImageWrapperStyle || styles.rightImageWrapperStyle}>
          <Image
            style={rightImageStyle || { width: 15, height: 15 }}
            source={rightImage}
            resizeMode="contain"
          />
        </View>
      )}
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
  rightImageWrapperStyle: {
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 10
  }
});
