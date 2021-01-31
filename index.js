const canvas = document.getElementById('preview');
const fileInput = document.querySelector('input[type="file"');
const asciiImage = document.getElementById('ascii');
var nomFichier ="";

const context = canvas.getContext('2d');

const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

var macroFinale ="";


const  macroFooter = "\n  </MacroEvents>\
\n</Macro>";

const macroClic = "\n       <!-- clique -->\
\n    <MacroEvent>\
\n        <Type>2</Type>\
\n    <MouseEvent>\
\n      <MouseButton>1</MouseButton>\
\n      <State>0</State>\
\n    </MouseEvent>\
\n    </MacroEvent>\
\n    <MacroEvent>\
\n    <Type>2</Type>\
\n    <MouseEvent>\
\n      <MouseButton>1</MouseButton>\
\n      <State>1</State>\
\n    </MouseEvent>\
\n    </MacroEvent>\
\n    <!-- fin clic -->";
const macroR = "\n    <!-- debut mouvement +x -->\
\n    <MacroEvent>\
\n    <Type>3</Type>\
\n    <MouseMovement>\
\n      <MouseMovementEvent>\
\n        <Type>3</Type>\
\n        <X>0</X>\
\n        <Y>0</Y>\
\n      </MouseMovementEvent>\
\n      <MouseMovementEvent>\
\n        <Type>3</Type>\
\n        <X>5</X>\
\n        <Y>0</Y>\
\n        <Delay>1</Delay>\
\n      </MouseMovementEvent>\
\n    </MouseMovement>\
\n    </MacroEvent>\
\n    <!-- fin mouvement -->";
const macroL = "\n  <!-- debut mouvement -x -->\
\n    <MacroEvent>\
\n    <Type>3</Type>\
\n    <MouseMovement>\
\n      <MouseMovementEvent>\
\n        <Type>3</Type>\
\n        <X>0</X>\
\n        <Y>0</Y>\
\n      </MouseMovementEvent>\
\n      <MouseMovementEvent>\
\n        <Type>3</Type>\
\n        <X>-5</X>\
\n        <Y>0</Y>\
\n        <Delay>1</Delay>\
\n      </MouseMovementEvent>\
\n    </MouseMovement>\
\n    </MacroEvent>\
\n    <!-- fin mouvement -->";

const macroS ="\n      <!-- debut mouvement -y -->\
\n    <MacroEvent>\
\n    <Type>3</Type>\
\n    <MouseMovement>\
\n      <MouseMovementEvent>\
\n        <Type>3</Type>\
\n        <X>0</X>\
\n        <Y>0</Y>\
\n      </MouseMovementEvent>\
\n      <MouseMovementEvent>\
\n        <Type>3</Type>\
\n        <X>0</X>\
\n        <Y>5</Y>\
\n        <Delay>1</Delay>\
\n      </MouseMovementEvent>\
\n    </MouseMovement>\
\n    </MacroEvent>\
\n    <!-- fin mouvement -->";

const macroF = "\n      <!-- frape -->\
\n    <MacroEvent>\
\n    <Type>1</Type>\
\n    <KeyEvent />\
\n    </MacroEvent>\
\n    <MacroEvent>\
\n    <Type>1</Type>\
\n    <KeyEvent>\
\n      <State>1</State>\
\n    </KeyEvent>\
\n    </MacroEvent>";

const getFontRatio = () => {
    const pre = document.createElement('pre');
    pre.style.display = 'inline';
    pre.textContent = ' ';

    document.body.appendChild(pre);
    const { width, height } = pre.getBoundingClientRect();
    document.body.removeChild(pre);

    return height / width;
};

const fontRatio = getFontRatio();

const convertToGrayScales = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);

    const grayScales = [];

    for (let i = 0 ; i < imageData.data.length ; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        const grayScale = toGrayScale(r, g, b);
        imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

        grayScales.push(grayScale);
    }

    context.putImageData(imageData, 0, 0);

    return grayScales;
};

const MAXIMUM_WIDTH = 60;
const MAXIMUM_HEIGHT = 60;

const clampDimensions = (width, height) => {
    const rectifiedWidth = Math.floor(getFontRatio() * width);

    if (height > MAXIMUM_HEIGHT) {
        const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
        return [reducedWidth, MAXIMUM_HEIGHT];
    }

    if (width > MAXIMUM_WIDTH) {
        const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
        return [MAXIMUM_WIDTH, reducedHeight];
    }

    return [rectifiedWidth, height];
};


fileInput.onchange = (e) => {
    

    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        nomFichier = files[i].name;
    }

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
            const [width, height] = clampDimensions(image.width, image.height);

            canvas.width = width;
            canvas.height = height;

            context.drawImage(image, 0, 0, width, height);
            const grayScales = convertToGrayScales(context, width, height);

            fileInput.style.display = 'none';
            drawAscii(grayScales, width);
        }

        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
};


function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

var contrastVar = $_GET('contrast');
contrastVar=parseInt(contrastVar, 10);

switch(contrastVar){
    case 0:
        var grayRamp = '@@@@.....................................................................';
    break;
    case 1:
        var grayRamp = '@@@@@@@@@@@..............................................................';
    break;
    case 4:
        var grayRamp = '@@@@@@@@@@@@@@@@@@@@.....................................................';
    break;
    case 5:
        var grayRamp = '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...........................................';
    break;
    case 6:
        var grayRamp = '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.................................';
    break;
    case 7:
        var grayRamp = '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@....................';
    break;
    case 8:
        var grayRamp = '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..........';
    break;
    default:
        var grayRamp = '@@@@@@@@@@@@@@@@@@@@@@@..................................................';
}


const rampLength = grayRamp.length;
const getCharacterForGrayScale = grayScale => grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];

const drawAscii = (grayScales, width) => {

    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
        let nextChars = getCharacterForGrayScale(grayScale);
        if ((index + 1) % width === 0) {
            nextChars += '\n';     
        }
        return asciiImage + nextChars;
    }, '');

    asciiImage.textContent = ascii;
    var monImage = asciiImage.textContent;

    var longeurligne = 0;

    const macroHeader ="<?xml version=\"1.0\" encoding=\"utf-8\"?>\
\n<Macro xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n  xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\
\n  <Name>z_macroDessin_"+nomFichier+"</Name>\
\n  <Guid>b6313fb3-d92a-4b2d-a4bc-031fdfb226c6</Guid>\
\n  <MacroEvents>";

    macroFinale = macroFinale + macroHeader;

    for (var i = 0; i < monImage.length; i++) {
        if (monImage.charAt(i) == "@"){
            macroFinale = macroFinale + "\n      <!-- avanceclic i = "+i+" longeurligne = "+longeurligne+" -->";
            macroFinale = macroFinale + macroClic;
            macroFinale = macroFinale + macroR;
            macroFinale = macroFinale + macroF;
            longeurligne++
        }else if(monImage.charAt(i) == "."){
            macroFinale = macroFinale + "\n      <!-- espace i = "+i+" longeurligne = "+longeurligne+" -->";
            macroFinale = macroFinale + macroR;
            macroFinale = macroFinale + macroF;
            longeurligne++
        }else{
            macroFinale = macroFinale + "\n      <!--  Vers_le_bas i = "+i+" longeurligne = "+longeurligne+" -->";
            macroFinale = macroFinale + macroS;
            macroFinale = macroFinale + macroF;
            do{
                macroFinale = macroFinale + "\n      <!--  retour  i = "+i+" longeurligne = "+longeurligne+" -->";
                macroFinale = macroFinale + macroL;
                macroFinale = macroFinale + macroF;
                longeurligne--
            }while (longeurligne != 0)
            longeurligne = 0
        }
      }
      macroFinale = macroFinale + macroFooter;


        var btn = document.querySelector('input');
        btn.addEventListener('click', updateBtn);
        function updateBtn() {
            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
              
                element.style.display = 'none';
                document.body.appendChild(element);
              
                element.click();
              
                document.body.removeChild(element);
              }
              
              // Start file download.
              download("z_macroDessin-"+nomFichier+".xml",macroFinale);
        }
      
      
};

console.log("made by yvan allioux yvanallioux.fr");
console.log("https://github.com/jpetitcolas/ascii-art-converter   Documentation used for image to ascii conversion");
console.log("https://www.razer.com/fr-fr/synapse-3 Razer Synapse 3 software to play the generated macros");