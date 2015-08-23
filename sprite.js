var mImage;

function Sprite( strimage, x, y, height, width )
{
    mImage = new Image(); 
    
    mImage.onload = function()
        {
            ctx.drawImage( mImage, x, y, height, width );
            console.log("loaded");
        }
    
    mImage.src = strimage;
    
    
    
    this.draw = function( x, y, height, width )
    {
        ctx.drawImage( mImage, x, y, height, width );
    }
    
    this.getHeight = function()
    {
        return mImage.height;
    }
    
    this.getWidth = function()
    {
        console.log( mImage.width );
        return mImage.width;
    }
}