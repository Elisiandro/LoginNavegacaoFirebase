import React from 'react'
import { Modal, TouchableOpacity, ScrollView, View, FlatList, Text, Image, Dimensions } from 'react-native'
import md5 from 'js-md5'
import { Actions } from 'react-native-router-flux';
import { StackActions } from 'react-navigation';


const PUBLIC_KEY = '13cba31a21d358a31c9f8def6c500c57'
const PRIVATE_KEY = '712e6224b545f9a53fdd6e9ce44ac4ea93a1e203'
const SCREEN_WIDTH = Dimensions.get('window').width

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Heroes'
    }

    state = {
        modalVisible: false,
        data: [],

        _path: '',
        _extension: '',
        _name: '',
        _description: ''


    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    setItemModal(item) {

        this.setState({
            _path: item.thumbnail.path,
            _extension: item.thumbnail.extension,
            _name: item.name,
            _description: item.description
        })
    }

    async componentDidMount() {
        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=20&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
        const responseJson = await response.json()
        this.setState({ data: responseJson.data.results })
    }




    _renderItem = ({ item }) => {



        return (
            <View style={{ marginTop: 22 }}>
                <TouchableOpacity onPress={() => this._onItemPress(item)} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                    <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
                    <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                </TouchableOpacity>


                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {

                        this.setModalVisible(false);
                    }}>
                    <ScrollView>
                        <Image
                            source={{ uri: `${this.state._path}.${this.state._extension}` }}
                            style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
                        />
                        <Text style={{ padding: 10, fontSize: 20 }}>{this.state._name}</Text>
                        <Text style={{ padding: 10 }}>{this.state._description}</Text>
                    </ScrollView>
                </Modal>

            </View>
        )
    }

    _onItemPress = (item) => {
        //this.props.navigation.navigate('Description', {hero: item})
        this.setModalVisible(true);
        this.setItemModal(item)

    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() =>
                    <View style={{ height: 1, backgroundColor: '#f7f7f7' }}
                    />}
            />
        )
    }
}