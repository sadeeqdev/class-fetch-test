import {albums, playlist, status} from './db.js'

// const checkPlaylist = (inputValue) => {
//     const items = []
//     playlist.forEach(item => {
//         items.push(item.tracks)
//     })

//     const data = items.flat().find(item => item.name == inputValue)
//     if(data){
//         return true
//     }
    
//     return false
// }


// const checkAlbumTracks = () => {
//     let editedAlbum = albums
//     let i = editedAlbum.tracks.length
//     while(i--){
//         if(!checkPlaylist(editedAlbum.tracks[i].name)){
//             editedAlbum.tracks.splice(i, 1); 
//         }
//     }

//     return editedAlbum
// }


//Remove album controller

class albumController {

    constructor(albums, playlist, status){
        this.albums = albums
        this.playlist = playlist
        this.status = status
    }

    remove = (id) => {
        let editedAlbum = this.getAlbum(id)

        let i = editedAlbum.files.length
        console.log("Files in album", editedAlbum.files.length)

        while(i--){
            if(this.checkAlbumInPlaylist(editedAlbum.files[i].filename)){
                console.log("Splicing", editedAlbum.files[i].filename)
                editedAlbum.files.splice(i, 1); 

            }
        }

        console.log("Files in album", editedAlbum.files.length)

        if(editedAlbum.files.length > 0){
            console.log("Album is greater 0")
        }else{
            this.removeAlbum(id).then(album => {
                if(album){
                    this.removeStatus(id).then(res => {
                        if(res){
                            console.log("Status and Album Deleted")
                        }
                    }).catch(err =>{
                        console.log("Error>>>", err)
                    }) 
                }
            }).catch(err => {
                console.log("Error>>>", err)
            })
        }

        return "Process finished"
    }

    checkAlbumInPlaylist = (fileName) => {
        const items = []

        this.playlist.forEach(item => {
            items.push(item.tracks)
        })
        console.log("FileName>>>", fileName)
        const data = items.flat().find(item => item.filename == fileName)
        
        if(data !== undefined){
            console.log("Item exists")
            return false  
        }else{
            console.log("Item not in playlist")
            return true
        } 
    }

    removeAlbum = (albumId) => {
        return new Promise((resolve, reject) => {
            const newAlbum = this.albums.filter(item => item._id !== albumId)
            if (newAlbum){
                resolve(newAlbum)
            }else{
                reject("Error Occurred while deleting album")
            }
        })
    }

    removeStatus = (albumId) => {
        return new Promise((resolve, reject) => {
            const newStatus = this.status.filter(item => item.postid !== albumId)
            if (newStatus){
                resolve(newStatus)
            }else{
                reject("Error Occurred while deleting status")
            }
        })
    }

    getAlbum = (albumId) => {
        const myAlbum = this.albums.find(item => item._id === albumId)
        return myAlbum
    }

}

const myController = new albumController(albums, playlist, status)
console.log(myController.remove("6353eeb31241ae4733aa04a9"))
