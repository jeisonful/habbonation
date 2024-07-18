document.addEventListener('DOMContentLoaded', function() {
    const widgetUrl = 'https://discord.com/api/guilds/1252989700319350884/widget.json';
    const membersList = document.getElementById('members-list');

    fetch(widgetUrl)
        .then(response => response.json())
        .then(data => {
            data.members.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('member');

                const avatar = document.createElement('img');
                avatar.src = member.avatar_url;
                avatar.alt = `${member.username}#${member.discriminator}`;
                avatar.width = 30;
                avatar.height = 30;

                const memberInfo = document.createElement('div');
                memberInfo.textContent = `${member.username}`;

                memberDiv.appendChild(avatar);
                memberDiv.appendChild(memberInfo);

                membersList.appendChild(memberDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching Discord widget data:', error);
        });
});
