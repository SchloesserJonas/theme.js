const themes = {
    light: {
        uid: 'light',
        name: 'Light',
        like: 'light',
        iat: new Date(IAT_DATE_HERE),
        exp: /*EXP DATE HERE OR PUT*/'never',
    },
    //FOR EXAMPLE:
    dark: {
        uid: 'dark',
        name: 'Dark',
        like: 'dark',
        iat: new Date("2024-02-11"),
        exp: 'never'
    }
}


module.exports = {
    load() {
        if(localStorage.theme != undefined) {

            if(themes[localStorage.theme].exp != 'never' && new Date() > themes[localStorage.theme].exp) {
                localStorage.removeItem('theme')
                this.load()
            }
            this.set(localStorage.theme)
        } else {
            if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
                this.set('dark')
            } else {
                this.set('light')
            }
        }
    },

    getList() {
        return themes
    },

    set(theme_uid) {
        document.documentElement.setAttribute('theme', theme_uid)
        document.documentElement.setAttribute('theme_like', themes[theme_uid].like)
        localStorage.setItem('theme', theme_uid)
    },

    get() {
        return localStorage.theme
    }
}