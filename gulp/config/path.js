import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
    build:{
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
    },
    src:{
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        scss: `${srcFolder}/scss/style.scss`,
        html:`${srcFolder}/*.html`,
    },
    watch:{
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.*`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html:`${srcFolder}/**/*.html`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp:``
}