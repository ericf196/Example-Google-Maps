import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

const google = window.google;

class Map extends Component {

    constructor(props) {
        super(props)

        this.state = {
            markers: this.props.markers,
            interval: '',
            currentPosition: 0,
            currentLat: this.props.centerMapCoordinates[0],
            currentLng: this.props.centerMapCoordinates[1],
            autoPlay: true
        }

        this.timer = this.timer.bind(this)

        this.onPlay = this.onPlay.bind(this)
        this.onStop = this.onStop.bind(this)
        this.onNext = this.onNext.bind(this)
        this.onPrevious = this.onPrevious.bind(this)
    }

    componentDidMount() {
        let interval = setInterval(this.timer, 7000)
        this.setState({ interval })
    }

    componentWillMount() {
        clearInterval(this.state.interval)
    }

    timer() {
        const { markers, currentPosition } = this.state

        this.setState({
            currentPosition: currentPosition + 1 < markers.length ? currentPosition + 1 : 0,
            currentLat: markers[currentPosition].lat,
            currentLng: markers[currentPosition].lng,
        })
    }

    onPlay() {
        console.log(this.state.autoPlay)
        this.setState({ autoPlay: true })
    }

    onStop() {
        console.log(this.state.autoPlay)
        this.setState({ autoPlay: false })
    }

    onNext() {        
        const { markers, currentPosition } = this.state
        this.setState({
            currentPosition: currentPosition + 1 < markers.length ? currentPosition + 1 : 0,
            currentLat: markers[this.state.currentPosition].lat,
            currentLng: markers[currentPosition].lng
        })
    }

    onPrevious() {       
        const { markers, currentPosition } = this.state
        this.setState({
            currentPosition: currentPosition - 1 <  0  ? markers.length -1 : currentPosition - 1,
            currentLat: markers[currentPosition].lat,
            currentLng: markers[currentPosition].lng
        })
    }

    render() {
        const { autoPlay, markers, currentLat, currentLng } = this.state
        const { centerMapCoordinates } = this.props
        let dinamicMarkers;
        if (markers) {
            dinamicMarkers = markers.map((value, index) => {
                return (
                    <Marker
                        key={index}
                        position={{ lat: value.lat, lng: value.lng }}
                        defaultTitle={value.name}
                        icon={value.icon}
                    />
                )
            })
        }


        const MyMapComponent = withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={autoPlay ? { lat: currentLat, lng: currentLng } : { lat: centerMapCoordinates[0], lng: centerMapCoordinates[1] }}
                defaultTitle={"Mapa"}
            >
                {dinamicMarkers}
            </GoogleMap>
        )
        return (
            <MyMapComponent
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `70vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}
export default Map;