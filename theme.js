const DEFAULT_DARK_THEME_UID = 'dark'       //REPLACE THIS WITH THE UID OF YOUR DEFAULT DARK THEME
const DEFAULT_LIGHT_THEME_UID = 'light'     //REPLACE THIS WITH THE UID OF YOUR DEFAULT LIGHT THEME

const themes = {
    light: {
        uid: 'light',
        name: 'Light',
        like: 'light',
        iat: 'year/month/day',
        exp: /*EXP DATE HERE OR PUT*/'never',
    },
    //FOR EXAMPLE:
    dark: {
        uid: 'dark',
        name: 'Dark',
        like: 'dark',
        iat: '04/1',
        exp: '2025/2/11'
    }
}

function iat(theme) {
    if(theme.iat == undefined) {
        return true
    }
    if(new Date((theme.iat.split('/').length == 3 ? parseInt(theme.iat.split('/')[0]) : new Date().getFullYear()), parseInt(theme.iat.split('/').slice(-2))-1, parseInt(theme.iat.split('/').slice(-1))) < new Date()) {
        return true
    } else {
        return false
    }
}

function exp(theme) {
    if(theme.exp == undefined || theme.exp == 'never') {
        return false
    }
    if(new Date((theme.exp.split('/').length == 3 ? parseInt(theme.exp.split('/')[0]) : new Date().getFullYear()), parseInt(theme.exp.split('/').slice(-2))-1, parseInt(theme.exp.split('/').slice(-1))) < new Date()) {
        return true
    } else {
        return false
    }
}


module.exports = {
    load() {
        if(localStorage.theme != undefined) {

            if(themes[localStorage.theme].exp != 'never' && exp(themes[localStorage.theme])) {
                localStorage.removeItem('theme')
                this.load()
            }
            this.set(localStorage.theme)
        } else {
            if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
                this.set(DEFAULT_DARK_THEME_UID)
            } else {
                this.set(DEFAULT_LIGHT_THEME_UID)
            }
        }
    },

    getThemes() {
        available_themes = []
        for(theme in themes) {
            if(iat(themes[theme]) && !exp(themes[theme])) {
                available_themes.push(themes[theme])
            }
        }
        return available_themes
    },

    getAllThemes() {
        all_themes = []
        for(theme in themes) {
            all_themes.push(themes[theme])
        }
        return all_themes
    },

    set(theme_uid) {
        document.documentElement.setAttribute('theme', theme_uid)
        if(themes[theme_uid].like != undefined) {
            document.documentElement.setAttribute('theme_like', themes[theme_uid].like)
        }        
        localStorage.setItem('theme', theme_uid)
    },

    get() {
        return localStorage.theme
    }
}