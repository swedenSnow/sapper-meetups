/* eslint-disable quotes */
export function isEmpty(value) {
    //! whitespace character OR no char at all
    return value.trim().length === 0;
}

export function isValidEmail(value) {
    return new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    ).test(value);
}

export function isValidUrl(value) {
    // const rgx = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/g;
    // return new RegExp(rgx).test(value);
    // return value.trim().length === 0;
    return value
}
