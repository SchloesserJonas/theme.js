# theme.js
A lightweight js library to easily use different themes on your website.

### Tested with vue and scss
This section is for vue users only<br>
Import the library in your main.js file
```javascript
    import theme from "./lib/theme"; //or "https://raw.githubusercontent.com/SchloesserJonas/theme.js/main/theme.js"


    //Set exported functions to be accessible using $theme.FUNCTION()
    app.config.globalProperties.$theme = theme
```
You do not need to import the file again, it's imported globally. Access it using $theme.FUNCTION()<br>
See available functions at the bottom of this file

## The theme.js file
```javascript
    const DEFAULT_LIGHT_THEME_UID = 'light'     //REPLACE THIS WITH THE UID OF YOUR DEFAULT LIGHT THEME
    const DEFAULT_DARK_THEME_UID = 'dark'       //REPLACE THIS WITH THE UID OF YOUR DEFAULT DARK THEME

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
            iat: 'month/day',
            exp: 'never'
        }
        // Add new objects for every theme you want to add
    }
    //REST OF THE CODE
```
| **Key** | **Meaning** | **default** | **mandatory to set** |
| --- | --- | -- | -- |
| **uid** | Unique id that gets saved to local storage to identify the theme<br>Must be identical to object key name | none | yes |
| **name** | Name to display in your html (eg. theme selector, etc) | none | no, but recommended |
| **like** | Group themes that base on the same style (eg. light and dark) to dynamically apply styles to multiple themes at once without listing them all | none | no |
| **iat** | 1. 'year/month/day': defines a static date on which the theme gets activated<br> 2. 'month/day': defines a relative date on which the theme gets activated (repeats every year) | none | no |
| **exp** | 1. 'year/month/day': defines a static date on which the theme gets deactivated<br> 2. 'month/day': defines a relative date on which the theme gets deactivated (repeats every year) | never | no |

You can exclude _like_, _iat_ and _exp_ if not needed.


## CSS/SCSS: Create a main.css/ main.scss file in the src directory
```css
html[theme="dark"] {
  /*Your CSS HERE*/
  /*EXAMPLE:*/
  .box {
    background: black;
  }  
}

html[theme="light"] {
  /*Your CSS HERE*/
  /*EXAMPLE:*/
  .box {
    background: white;
  }  
}

html[theme="YOUR NEXT THEME NAME HERE"] {
  /*Your CSS HERE*/
  /*EXAMPLE:*/
  .box {
    background: pink;
  }  
}
```
import the file in your style tag in your views/ components to automatically apply the defined styles.

## The like selector
The like key is used to group multiple themes together<br>
Some themes base on certain categroies (eg. dark or light), so you can group certain css properties.<br>
Use the theme_like key to check the categories.
```css
html[theme_like="dark"] {
  /*Your CSS HERE*/
  /*EXAMPLE:*/
  html {
    background: black;
  }  
}

html[theme_like="light"] {
  /*Your CSS HERE*/
  /*EXAMPLE:*/
  html {
    background: white;
  }  
}
```

## Functions
| function name | action | input value | return value |
| --- | --- | --- | --- |
| **load()** | Recommended to call on first page load to check if there already is a theme set and if so apply it | - | - |
| **getThemes()** | Returns a list of all available themes. Excludes themes that aren't available because of restrictions specified in _iat_ and _exp_ | - | array |
| **getAllThemes()** | Returns a list of all registered themes | - | array |
| **set()** | Sets the theme to the given theme uid | theme uid (depends on config int or string) | - |
| **get()** | Returns the currently used theme | - | string |


## ⚠️ Uses LocalStorage
**You might have to mention it in your Cookie Banner**