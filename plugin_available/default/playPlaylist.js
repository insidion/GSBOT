var playPlaylist = {
    author: 'pironic',
    name: 'playPlaylist',
    description: '- add a playlist to the end of the current broadcast queue by the provided playlist ID.',
    config: {
        permission: ['guest']
    },
    onCall: function(request) {
        // check if there are more than 1 arguments
        var args = request.params.split(" ");
        for(var i = 0;i<args.length;i++){
            // find the playlist id in the command, and error check it.
            var playlistID = parseInt(args[i]);
            console.log(playlistID);
            if (!(playlistID > 0)) {
                request.sendChat(args[i] + ' does not appear to be a valid playlistID.');
                return false;
            }

            // start by getting the songs in the playlist
            var payload = {"method":"playlistGetSongs","parameters":{"playlistID": playlistID}};
            request.moreCmd(payload, function(resp) {

                // make sure there are songs in the playlist and its a valid playlist
                if (typeof resp.Songs !== 'undefined') {
                    var songs = resp.Songs;
                    console.log(resp);

                    // get a list of songIDs from the list of songs in the playlist
                    var songIDs = [];
                    for (i = 0;i < songs.length;i++) {
                        songIDs.push(songs[i].SongID);
                    }

                    // add that list to the queue.
                    request.addSongs(songIDs);

                    // tell the user of our success
                    request.sendChat(songs.length+' songs added to the queue from Playlist: \'' + playlistID + '\'.');
                }
                else {
                    request.sendChat('There was a problem finding any songs for the playlist with ID \'' + args[i] + '\'.');
                }
            });
        }
    }
};

module.exports = {mod: playPlaylist};
