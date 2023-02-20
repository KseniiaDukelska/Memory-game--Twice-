export const copy =() => {
    return app.gulp.src(app.path.src.img)
    .pipe(app.gulp.dest(app.path.build.img))
}