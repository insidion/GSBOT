var about = {
 author: 'uman',
 name: 'about',
 description: '- About this software.',
 onCall: function(request) {
    request.sendChat('This broadcast is currently running "Grooveshark Broadcast Bot" v2, created by grooveshark.com/uman42 ~ github.com/UlysseM/GSBOT/');
 }
};

module.exports = {mod: about};
