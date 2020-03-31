'use strict'

var gTrans = {
    'lang-choose': {
        en: 'Language:',
        he: 'בחר שפה'
    },
    'title-word-1': {
        en: 'My ',
        he: 'חנות'
    },
    'title-word-2': {
        en: 'Book ',
        he: 'הספרים'
    },
    'title-word-3': {
        en: 'Shop',
        he: 'שלי'
    },
    'book-id': {
        en: 'ID',
        he: 'מספר סידורי'
    },
    'book-title': {
        en: 'TITLE',
        he: 'שם הספר'
    },
    'book-price': {
        en: 'PRICE',
        he: 'מחיר הספר'
    },
    'book-actions': {
        en: 'ACTIONS',
        he: 'פעולות'
    },
    'add-book-btn': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'book-title-ph': {
        en: 'Book Title',
        he: 'שם הספר'
    },
    'book-price-ph': {
        en: 'Book Price',
        he: 'מחיר הספר'
    },
    'book-read-btn': {
        en: 'Read',
        he: 'קרא'
    },
    'book-update-btn': {
        en: 'Update',
        he: 'ערוך'
    },
    'book-delete-btn': {
        en: 'Delete',
        he: 'מחק'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    // Get from gTrans
    var langTransMap = gTrans[transKey]
    // If key is unknown return 'UNKNOWN'
    if (!langTransMap) return 'UNKNOWN';
    // If translation not found - use english
    var trans = langTransMap[gCurrLang]
    if (!trans) trans = langTransMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const key = el.dataset.trans;
        const trans = getTrans(key)

        if (el.placeholder) el.placeholder = trans
        else el.innerText = trans
    })
}

function setLang(lang) {
    gCurrLang = lang;
}