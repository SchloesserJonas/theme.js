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
    if(_toDate(theme.iat) > new Date()) {
        return false
    }
    return true
}

function exp(theme) {
    if(theme.exp == undefined || theme.exp == 'never') {
        return false
    }
    if(_toDate(theme.exp) < new Date()) {
        if(_toDate(theme.iat) > _toDate(theme.exp)) {
            return false
        }
        return true
    }
    return false
}

function _toDate(date) {
    if(date.split("/").length == 2) return new Date(new Date().getFullYear() + "/" + date)
    if(date.split("/").length == 3) return new Date(date)
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
            theme = themes[theme]
            if(iat(theme) && !exp(theme)) {
                theme.iat = _toDate(theme.iat)
                theme.exp = _toDate(theme.exp)
                available_themes.push(theme)
            }
        }
        return available_themes
    },

    getAllThemes() {
        return themes
    },

    set(theme_uid) {
        if(!Object.keys(themes).includes(theme_uid)) {
            return
        }
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