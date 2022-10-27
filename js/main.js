

let endOfThePage = 0;

let preloading = false;

const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('showPreloader');
    preloader.style.display = 'block';
};

const hidePreloader = () => {
    preloader.style.display = 'none';
    console.log('hidePreloader');

};
const getData = () => {
    if (!preloading) {

    }
    preloading = true;
    fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(res => res.json())
        .then(data => {

            let body = document.body;
            let hr = document.createElement('hr');
            body.appendChild(hr);

            for (let user of data) {
                let pId = document.createElement('p');
                let pName = document.createElement('p');
                let pWebsite = document.createElement('p');

                pId.innerText = `User ID: ${user.id}`;
                pName.innerText = `User Name: ${user.name}`;
                pWebsite.innerHTML = `User URL: ${user.pWebsite}<br />-------------`;



                body.appendChild(pId);
                body.appendChild(pName);
                body.appendChild(pWebsite);


            }
            preloading = false;
            hidePreloader();
        })
        .catch(error => {
            console.log(error);
        });

}

const scrollToEndOfPage = () => {

    let scrollHeigth = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeigth = document.documentElement.clientHeight;

    let sumScrollTopClientHeigth = Math.ceil(scrollTop + clientHeigth);

    console.log(`sumScrollTopClientHeigth: ${sumScrollTopClientHeigth}`);

    console.log(`scrollHeigth: ${scrollHeigth}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeigth: ${clientHeigth} `);
    console.log('===================');

    if (sumScrollTopClientHeigth >= scrollHeigth) {
        console.log(`Scrolled to the end of the page nr: ${endOfThePage}`);
        endOfThePage += 1;
        showPreloader();
        getData();
        
    }
}

window.addEventListener('scroll', scrollToEndOfPage);
