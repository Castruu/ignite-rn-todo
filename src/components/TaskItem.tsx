import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen/Pen.png'
import cancelIcon from '../assets/icons/cancel/X.png'

import Icon from 'react-native-vector-icons/Feather';



interface TaskItemProps {
    item: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskName: string) => void;
}

export const TaskItem = ({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(item.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true)
    }
    function handleCancelEditing() {
        setEditTitle(item.title)
        setIsEditing(false)
    }
    function handleSubmitEditing() {
        editTask(item.id, editTitle);
        handleCancelEditing();
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (<>
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
            >
                <View
                    testID={`marker-${index}`}
                    style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                    {item.done && (
                        <Icon
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                    )}
                </View>

                <TextInput
                    value={editTitle}
                    onChangeText={setEditTitle}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    style={item.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />
            </TouchableOpacity>
        </View>

        <View
            style={{ paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center' }}
        >
            {isEditing ?
                <TouchableOpacity
                    testID={`cancel-${index}`}
                    onPress={handleCancelEditing}
                >
                    <Image source={cancelIcon} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    testID={`edit-${index}`}
                    onPress={handleStartEditing}
                >
                    <Image source={editIcon} />
                </TouchableOpacity>
            }
            <TouchableOpacity
                testID={`trash-${index}`}
                onPress={() => removeTask(item.id)}
                style={{marginLeft: 5}}
            >
                <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}}/>
            </TouchableOpacity>
        </View>

    </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})