import React from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity, PanResponder, Image, Dimensions } from 'react-native';
import { Icons, Fonts } from '../../../config';
import * as NB from 'native-base';

const { fontScale } = Dimensions.get('window')

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropDown: false,
            placeholder: this.props.placeholder
        }
    }
    isOpenDropDown = () => {
        this.state.dropDown && this.setState({
            dropDown: false
        })
    }

    onValueChanged = (item) => {
        this.props.onValue(item);
        this.setState({
            placeholder: item,
            dropDown: false
        })
    }
    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentWillMount() {

        let a = window.onBodyPress
        window.onBodyPress = () => {
            this.mounted && this.setState({ dropDown: false });
            a && a()
        };
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            // onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderTerminate: (evt, gestureState) => console.log(evt),
        });
    }

    render() {
        return (
            <View style={[this.props.containerSyle, { position: 'relative', width: '100%' }]}>
                <TouchableOpacity onPress={() => { window.onBodyPress && window.onBodyPress(); this.setState({ dropDown: !this.state.dropDown }) }}>
                    <View style={{ position: 'relative', elevation: 1, flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                        <Text style={{ color: '#8DAAB9', fontFamily: Fonts.book, fontSize: fontScale * 14 }}>{!this.state.dropDown ? this.state.placeholder : " "}</Text>
                        {/* <Image source={Icons.dropDown} style={{ height: 6, width: 12, resizeMode: 'contain' }} /> */}
                        <NB.Icon name="md-arrow-dropdown" style={{ color: 'grey', fontSize: 20 }}  />
                    </View>
                </TouchableOpacity>
                {this.state.dropDown && <View style={this.props.itemView}>
                    {this.props.items.map((item, key) => <Text onPress={() => this.onValueChanged(item)} key={key} style={{ color: '#8DAAB9', padding: 10,  fontFamily: Fonts.book }}>{item}</Text>
                    )}
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
