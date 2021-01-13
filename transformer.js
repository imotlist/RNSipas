var sassTransformer = require("react-native-sass-transformer");
var svgTransformer = require("react-native-svg-transformer");

module.exports.transform = ({ src, filename, options }) => {
    if (filename.endsWith(".scss") || filename.endsWith(".sass")) {
        return sassTransformer.transform({ src, filename, options });
    } else{
        return svgTransformer.transform({ src, filename, options });
    }
};