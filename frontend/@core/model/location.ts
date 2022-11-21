export  interface MarkerProps {
    latitude: number;
    longitude: number;
}
export  interface CurrentLocation {
    latitude?: number;
    longitude?: number;
    heading?: number;
}
export  interface MapViewProps {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}