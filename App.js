import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import Stages from './components/Stages';
import Category from './components/Categories';
import { Audio } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'
// import { Audio } from 'expo-av'

let newArr = [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" },
{ name: "5" }, { name: "6", }, { name: "7", }, { name: "8", }, { name: "9", },
{ name: "10" }, { name: "11" }, , { name: "12" }]

const audioBookPlaylist = [
  {
    title: 'Hamlet - Act I',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act II',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act III',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act IV',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act V',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  }
]

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      playbackInstance: null,
      isPlaying: false,
      // playbackInstance: null,
      currentIndex: 0,
      volume: 1.0,
      isBuffering: false

    }
    // this.playbackInstance = null;
  }

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

      this.sound = new Audio.Sound()

      const status = {
        shouldPlay: false
      }
      this.sound.loadAsync(require('./assets/overkilling.mp3'))

      this.loadAudio()
    } catch (e) {
      console.log(e)
    }
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound()

    const { currentIndex, isPlaying, volume } = this.state

    try {
      const source = {
        uri: audioBookPlaylist[currentIndex].uri
      }

      const status = {
        shouldPlay: isPlaying,
        volume
      }

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
      await playbackInstance.loadAsync(source, status, false)
      this.setState({ playbackInstance })
    } catch (e) {
      console.log(e)
    }
  }

  onPlaybackStatusUpdate = status => {
    this.setState({
      isBuffering: status.isBuffering
    })
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

    this.setState({
      isPlaying: !isPlaying
    })
  }

  handlePreviousTrack = async () => {
    let { playbackInstance, currentIndex } = this.state
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex < audioBookPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
      this.setState({
        currentIndex
      })
      this.loadAudio()
    }
  }

  handleNextTrack = async () => {
    let { playbackInstance, currentIndex } = this.state
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
      this.setState({
        currentIndex
      })
      this.loadAudio()
    }
  }



  renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {audioBookPlaylist[currentIndex].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].author}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].source}
        </Text>
      </View>
    ) : null
  }

  playSound() {
    this.sound.playAsync()
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar style="auto" />
        <Stages title="stages" elem={newArr} />
        <Category title={"Stage 1"} /> */}

        <Image
          style={styles.albumCover}
          source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
        />
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
            <Ionicons name='ios-skip-backward' size={48} color='#444' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
            {this.state.isPlaying ? (
              <Ionicons name='ios-pause' size={48} color='#444' />
            ) : (
                <Ionicons name='ios-play-circle' size={48} color='#444' />
              )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
            <Ionicons name='ios-skip-forward' size={48} color='#444' />
          </TouchableOpacity>
        </View>
        {this.renderFileInfo()}
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: "flex-start",
    //   justifyContent: 'flex-start',
    // },


    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  albumCover: {
    width: 250,
    height: 250
  },
  controls: {
    flexDirection: 'row'
  },
  control: {
    margin: 20
  }

});

export default App;