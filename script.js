fetch('art.json')
    .then(response => response.json())
    .then(json => {

    console.log(json)
    const art = json.Projects;
    console.log(art)

    const project1Url1 = data.Projects[0]?.images[0]?.url1;
    console.log(project1Url1);
})
.catch(error => console.error('Error:', error));