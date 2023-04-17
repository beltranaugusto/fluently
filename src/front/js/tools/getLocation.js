// Get the current location of the user.

const successCallback = (position) => {
    console.log([position.coords.latitude, position.coords.longitude]);
};
const errorCallback = (error) => {
    console.log(error);
};

export const getLocation = () => {
    return navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
