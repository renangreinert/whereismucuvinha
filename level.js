///////////////////////////////////////////////////////
/// Estrutura com as configuracoes lidas do "config.txt"
///////////////////////////////////////////////////////
function Config()
{
    this.mCoordX = 0;    
    this.mCoordY = 0;
    this.mCityName = "null";
    this.mDescription = "";
}


function loadConfig(foldername)
{
    var str = loadFile( foldername + "/config.txt" );
    
    var config = new Config;
    
    var pieces = String( str ).split(";");
    
    config.mCityName = pieces[0];
    
    if ( pieces[2] )
    {
        config.mDescription = String( pieces[2] );
    }
    
    pieces = String( pieces[1] ).split(",");
    
    config.mCoordX = pieces[0];
    config.mCoordY = pieces[1];
    
    
    return config;
    
}

///////////////////////////////////////////////////////
/// Calculate the correct position for coord X and Y, 
/// considering that the image was resized and repositioned.
/// Receives a "Level" object.
///////////////////////////////////////////////////////
function calculateRealPosition( objLevel )
{
    objLevel.mMucuvinhaPosX = objLevel.mConfig.mCoordX * objLevel.IMG_WIDTH / objLevel.mImageFundo.getWidth();
    objLevel.mMucuvinhaPosX += objLevel.IMG_POS_X;
    
    objLevel.mMucuvinhaPosY = objLevel.mConfig.mCoordY * objLevel.IMG_HEIGHT / objLevel.mImageFundo.getHeight();
    objLevel.mMucuvinhaPosY += objLevel.IMG_POS_Y;
    
    //alert( objLevel.mMucuvinhaPosX );
}


function Level(foldername)
{
    {//constructor;
        
        this.IMG_POS_X = 0;
        this.IMG_POS_Y = 50;
        this.IMG_WIDTH = SCREEN_SIZE_X;
        this.IMG_HEIGHT = this.IMG_WIDTH/1.5;
        this.MUCUVINHA_SIZE = 30;  //area de clique do mucuvinha
        
        this.mDescriptionPrinted = 0;
        
        this.mMucuvinhaPosX = -1;    //guardam as coordenadas do local do clique
        this.mMucuvinhaPosY = -1;
        
        this.mPhoto = "foto.jpg";
        this.mFolderName = foldername;
        this.mConfig = new Config();       //dados lidos do arquivo de configuracao
        
        
        this.mConfig = loadConfig(this.mFolderName);
        
        this.mImageFundo = new Sprite( foldername + "/foto.jpg", this.IMG_POS_X, this.IMG_POS_Y, this.IMG_WIDTH, this.IMG_HEIGHT );
        
        
   
    }

    
    /////////////////////// Functions //////////////////////
    this.printCityName = function()
    {
        ctx.fillStyle = "#222";
        ctx.font = "20px Arial";
        ctx.fillText(this.mConfig.mCityName, 0, 40);
    }
    
    this.printDescription = function()
    {
        ctx.fillStyle = "#222";
        ctx.font = "14px Arial";
        ctx.fillText(this.mConfig.mDescription, 0, this.IMG_POS_Y + this.IMG_HEIGHT + 50 );
    }
    
    
    this.show = function()
    {        
        this.mImageFundo.draw( this.IMG_POS_X, this.IMG_POS_Y, this.IMG_WIDTH, this.IMG_HEIGHT );
        
        console.log("show");
        
        calculateRealPosition( this );
       
        if ( this.mDescriptionPrinted == 0 )
        {
            this.printCityName();
            this.printDescription();  
            
            this.mDescriptionPrinted = 1;
        }
             
    }
    
    this.clicked = function( posX, posY )
    {
        if ( 
            posX > this.mMucuvinhaPosX - this.MUCUVINHA_SIZE &&  
            posX < this.mMucuvinhaPosX + this.MUCUVINHA_SIZE &&
            posY > this.mMucuvinhaPosY - this.MUCUVINHA_SIZE &&
            posY < this.mMucuvinhaPosY + this.MUCUVINHA_SIZE 
            )
        {
            console.log("ehh");
            return "level_found";
        }
        else
        {
            console.log( "posX: " + posX + "posY: " + posY + "Mucuvinha: " + this.mMucuvinhaPosX );
        }
    }
    
    /*this.getCityName = function()
    {
        return this.mConfig.mCityName;
    }*/
};