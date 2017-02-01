import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import R from 'ramda';
import classroomIcon from '../../../images/classroom-icon.png';

const ClassroomItem = ({ classroom, join }) => {
  const joinClassroom = () => join(classroom.id);
  const { title, instructorName, description, imageURL, id } = classroom;
  const imageSrc = imageURL ? {uri: imageURL} : classroomIcon;
  return (
    <TouchableOpacity style={styles.classItem} onPress={joinClassroom}>
      <View>
        <Image style={styles.classImage} source={imageSrc} />
      </View>
      <View style={styles.classInfo}>
        <Text style={styles.classTitle}> {title} </Text>
        <Text style={styles.classInstructor}> with {instructorName} </Text>
      </View>
    </TouchableOpacity>
  )
}

const StudentClassList = ({ classrooms, join }) => {
  return (
    <ScrollView style={styles.classList}>
      { classrooms.map(classroom => <ClassroomItem key={classroom.id} classroom={classroom} join={join} />) }
    </ScrollView>
  )
};


const styles = StyleSheet.create({
  classList: {
    backgroundColor: 'white',
    padding: 5,
  },
  classItem: {
    height: 100,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'darkgrey',
    borderRadius: 3,
    marginBottom: 3,
  },
  classImage: {
    height: 35,
    width: 35,
  },
  classInfo: {
    flex: 1,
    paddingLeft: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  classTitle: {
    fontSize: 18,
    textAlign: 'left',
  },
  classInstructor: {
    fontSize: 14,
    color: 'darkgrey',
  }
});

export default StudentClassList;
