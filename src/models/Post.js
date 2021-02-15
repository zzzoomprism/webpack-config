export default class Post
{
    constructor( title, image, xml, csv )
    {
        this.title = title;
        this.image = image;
        this.xml = xml;
        this.csv = csv;
    }

    toString()
    {
        return JSON.stringify( {
            title: this.title,
            image: this.image
        }, null, 2 )
    }
    insertImage()
    {
        const container = document.getElementById( 'joel-image' );
        container.setAttribute( 'src', this.image );
        container.setAttribute( 'width', '100%' );
    }
    xmlData()
    {
        const div = document.getElementById( 'xml-data' );
        div.innerHTML = this.xml.email.to;
    }

    csvData()
    {
        const div = document.getElementById( 'csv-data' );
        div.innerHTML = `<code>${ JSON.stringify( this.csv, null, 4 ) } </code>`
    }
}