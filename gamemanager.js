GameManager_EStates =
{
    PLAYING: 1
}

var GameManager_state = GameManager_EStates.PLAYING;
var GameManager_level;
var GameManager_levelNumber = 0; //quantidade de fases que o jogador ja passou
var GameManager_folders;   //guarda o vetor com as pastas onde tem fotos

function repaint()
{
    ctx.clearRect ( 0 , 0 , SCREEN_SIZE_X, SCREEN_SIZE_Y );
}

//////////////////////////////////////////
/// Carrega o nome das pastas que contem fotos
//////////////////////////////////////////
function loadFolderNames()
{
    var aux = loadFile("paises.txt");
    
    GameManager_folders = String( aux ).split(";");
    
    shuffleArray( GameManager_folders );
}

function GameManager_printLevelNumber()
{
    ctx.fillStyle = "#222";
    ctx.font = "20px Arial";
    ctx.fillText("level: " + (GameManager_levelNumber + 1), GameManager_level.IMG_POS_X + GameManager_level.IMG_WIDTH / 2, GameManager_level.IMG_HEIGHT + 20 + GameManager_level.IMG_POS_Y );
}

function GameManager_init()
{
    loadFolderNames();
    
    GameManager_level = new Level(GameManager_folders[0]);
    
    GameManager_printLevelNumber();
}

function GameManager_play()
{
    GameManager_level.show();
}

function GameManager_clicked( x, y )
{
    GameManager_level.clicked( x, y );
    if ( GameManager_level.clicked( x, y ) == "level_found" )
    {
        GameManager_levelNumber++;
        if ( GameManager_levelNumber >= GameManager_folders.length )
        {
            GameManager_levelNumber = 0;
        }
        
        GameManager_level = new Level(GameManager_folders [GameManager_levelNumber] );
        
        //console.log("ehhh");
        repaint();
        
        GameManager_printLevelNumber();
    }
    else
    {
        //console.log("noooo");
    }
}

