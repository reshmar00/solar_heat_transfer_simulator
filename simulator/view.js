let scene, camera, renderer;

const view = {

    /* Rendering scene using THREE.js library */
    renderScene: function(){
        /* Setting up the scene and camera */
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer();
        const container = document.querySelector('.left');
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        /* Adding a cylinder */
        const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cylinder = new THREE.Mesh(geometry, material);
        scene.add(cylinder);

        /* Calling 'animate' to be able to actually view
         * the scene + its elements */
        this.animate();
    },

    /* Function to animate the scene - binding it to the view */
    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        renderer.render(scene, camera);
    },

    /* Splitting up the scene for different views */
    setScreenSplit: function() {
        const leftRatio = 3/5;
        const rightRatio = 2/5;

        document.querySelector('.left').style.width = `${leftRatio * 100}%`;
        document.querySelector('.right').style.width = `${rightRatio * 100}%`;
    },

    /* Logic for selecting the month and date*/
    /* Month selection */
    populateMonthDropdown: function() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthDropdown = document.getElementById('monthList');

        monthDropdown.innerHTML = '<option>---Choose month---</option>'; // Clear current month options

        months.forEach(month => {
            const option = document.createElement('option');
            option.text = month;
            monthDropdown.appendChild(option);
        });
    },

    /* Date selection - based on month ~ account for 30/31 days + Feb */
    dateListElement: document.getElementById('dateList'),
    updateDateOptions: function(month) {
        // Clear current date options
        this.dateListElement.innerHTML = '<option> ---Choose date--- </option>';

        let numDays = 31;  // default value
        if (["April", "June", "September", "November"].includes(month)) {
            numDays = 30;
        } else if (month === "February") {
            numDays = 28;
        }

        for (let i = 1; i <= numDays; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.text = i;
            dateList.appendChild(option);
        }
    },

    /* Setting up the temperature slider's value... */
    temperatureValueElement: document.getElementById('temperature-value'),
    /* ... and logic for updating its display */
    updateTemperatureDisplay: function(value) {
        this.temperatureValueElement.textContent = value;
    }
};