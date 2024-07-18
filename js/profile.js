document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const server = document.getElementById('server').value;
        fetchUserInfo(username, server);
    });

    function fetchUserInfo(username, server) {
        fetch(`https://origins.${server}/api/public/users?name=${username}`)
            .then(response => response.json())
            .then(data => {
                displayUserInfo(data, server);
            })
            .catch(error => console.error('Error:', error));
    }

    function displayUserInfo(data, server) {
        const userInfo = document.getElementById('user-info');
        const avatarImageUrl = `https://www.${server}/habbo-imaging/avatarimage?figure=${data.figureString}&direction=4&head_direction=4&action=wav`;

        const onlineStatusImg = data.online ? 'images/online.gif' : 'images/offline.gif';
                const onlineStatusAlt = data.online ? 'En línea' : 'Fuera de línea';

                const fechaMiembro = new Date(data.memberSince);
                const dia = fechaMiembro.getDate();
const mes = fechaMiembro.toLocaleString('default', { month: 'short' }); // Obtén el mes en formato corto (por ejemplo, "Jun")
const año = fechaMiembro.getFullYear();
const fechaFormateada = `${dia}-${mes}-${año}`;



                userInfo.innerHTML = `
                   

                    <div class="w_skin_defaultskin">
    
	<div class="widget-corner" id="widget-1-handle">
		<div class="widget-headline"><h3>
		<span class="header-left"></span><span class="header-middle">PERFIL</span>
        <span class="header-right"></span></h3>
		</div>	
	</div>

	<div class="widget-body">
		<div class="widget-content">

	<div class="profile-info">		
				<div class="name" style="float: left"><span class="name-text">${data.name}</span></div>
                <br>

		<img src="${onlineStatusImg}" alt="${onlineStatusAlt}" class="online-status">
        <div class="birthday text">Habbo creado <br>en:</div>
		<div class="birthday date">${fechaFormateada}
        
        </div>
    <span id="badges"></span>
    
    <div class="profile-motto">
                <span class="motto-user">${data.motto}</span>
            </div>
            
			</div>		
            <div class="profile-figure">
			<img alt="${data.name}" src="${avatarImageUrl}">
	</div>		   
	</div>
    
    </div>
    
</div>




                `;

        const badges = data.selectedBadges;
        const badgesContainer = document.getElementById('badges');
        badgesContainer.innerHTML = '';
        badges.forEach(badge => {
            const badgeElement = document.createElement('span');
            badgeElement.className = 'badge';
            badgeElement.innerHTML = `
            <img src="https://images.habbo.com/c_images/album1584/${badge.code}_HHAU.png" alt="Avatar de ${data.name}">
                
            `;
            badgesContainer.appendChild(badgeElement);
        });
    }
});
