export const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/';

export const ApiEndPoints = {
    GoogleMaps: {
        Geocoding: 'geocode/json',
        PlacesAutoComplete: 'place/autocomplete/json',
    },
    auth: {
        login: '/api/login',
        register: '/api/signup',
        forgotPassword: '/api/send-otp',
        otpSubmut: '/api/submit-otp',
        logout:'/api/logout'
    },
    categories: {
        getCategory: '/api/get-category',
        subCategory: '/api/get-sub-category'
    },
    recentItems: '/api/recent-item-list',
    recentItemsDetails: '/api/recent-item-details',
    favourites: '/api/get-favorites',
    search: '/api/search-items',
    banner: '/api/get-banner',
    slider: '/api/get-slider',
    addItem: '/api/add-item',
    contactUs: '/api/add-contact',
    changePassword: '/api/change-password',
    location: {
        getStates: '/api/get-state',
        getCity: '/api/get-destrict',
        getLocality: '/api/get-city',
        getCountries:'/api/all-currencies'
    },
    myItems: '/api/list-item',
    itemDelete: '/api/delete-item',
    editItem: '/api/edit-item',
    myItemDetails: '/api/item-details',
    itemStatus: '/api/item-status',
    getbrands: '/api/get-brand',
    addReels: '/api/add-sort-video',
    myReels: '/api/list-of-sort-video',
    deleteReel: '/api/delete-sort-video',
    profileDetails: '/api/get-profile',
    updateProfile: '/api/update-profile',
    allReels: '/api/all-short-videos',
    likeReel: '/api/like-short-video',
    addFavouite:'/api/add-favorites',
    getNotifications:'/api/notification',
    chatNotification:'/api/send-notification',
    socialLogin:'/api/login_google',
    socialLinking:'/api/social_linking',
    registerVerfiy:'/api/vairifiy_otp',
    loginWithPhone:'/api/login-phone',
    verifyMobile:'/api/phone-otp',
    deleteGoogleLink:'/api/delete-google-link'

}