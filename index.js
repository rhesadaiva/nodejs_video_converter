const FFMPEG = require('fluent-ffmpeg');

const convertVideo = (source, dest, format) => {
    const command = FFMPEG(source)
        .videoCodec('libx265')
        .toFormat(format)
        .on("start", commandLine => {
            console.log(`Spawned Ffmpeg with command: ${commandLine}`);
        })
        .on("error", (err, stdout, stderr) => {
            console.log('An error occured: ', err, stdout, stderr);
        })
        .on("end", (stdout, stderr) => {
            console.log('Process end: ', stdout, stderr);
        })
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done');
        });
    command.save(dest)
}


convertVideo('./videotest.mpg', './functionss.mp4', 'mp4');