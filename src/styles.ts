type Lang = [string, number]; // tuple

const langs: Lang[] = [
    ['js', 80],
    ['ts', 90],
    ['html', 85],
    ['css', 75],
    ['python', 45],
    ['fs', 15],
];

const mixinWide = (lang: Lang) => {
    return {
        [`.${lang[0]}`]: {
            '&.skill': {
                height: lang[1]
            },
            gridArea: lang[0]
        }
    };
};

const mixinNarrow = (lang: Lang) => {
    return {
        [`.${lang[0]}`]: {
            '&&.skill &': {
                height: '100%',
                width: lang[1]
            }
        }
    }
}

const wideClasses = langs.reduce((all, lang) => {
    const langStyle = mixinWide(lang);
    return { ...all, ...langStyle };
}, {});

const narrowClasses = langs.reduce((all, lang) => {
    const langStyle = mixinNarrow(lang);
    return { ...all, ...langStyle };
}, {});

const styles = {
    '.button': {
        'background-color': 'red',
        paddingTop: '4px'
    },
    '.item': {
        padding: '10px',
        '.item__button': {
            textAlign: 'center',
            backgroundColor: 'blue'
        }
    },
    '.grid-section': {
        display: 'grid',
        gridTemplateColumns: `repeat(${langs.length}, 1fr)`,
        gridTemplateRows: '100vh',
        gridTemplateAreas: `"${langs.map(l => l[0]).join(' ')}"`
    },
    ...wideClasses,
    '@media (max-width: 768px)': {
        '.grid-section': {
            gridTemplateRows: `repeat(${langs.length}, calc(100vh / ${langs.length}))`,
            gridTemplateColumns: '1fr',
            gridTemplateAreas: langs.map(l => `"${l[0]}"`).join(' ')
        },
        ...narrowClasses
    }
};

// console.log(JSON.stringify(styles, null, 2));

export = styles;
