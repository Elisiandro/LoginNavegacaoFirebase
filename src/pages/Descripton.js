import React, { Component } from 'react'
import { ScrollView, Image, Dimensions, Text } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('screen').width

export default class Description extends Component {
    


    constructor(props) {
        super(props);
      }
    
      
    
    static navigationOptions = {
        title: 'Description'
    }

    render() {

        // console.log(this.props.hero)
        // console.log(this.props.navigation.state.params)


        const { hero } = this.props.navigation.state.params
        return (
           <ScrollView>
               <Image 
                    source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
                    style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}}
                />
                <Text style={{padding:10, fontSize:20}}>{hero.name}</Text>
                <Text style={{padding:10}}>{hero.description}</Text>
           </ScrollView> 
        )
    }
}