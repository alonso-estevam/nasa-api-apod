$('#btn').click(function (e) {
    e.preventDefault()
    const dateInput = $('#userDate');
    const newDate = `&date=${dateInput.val()}&`;
    $.ajax({
        url: `https://api.nasa.gov/planetary/apod?api_key=IO6PTTTNOu29nSXzv8Toq8FqqRNCJvcOv3ybUVLm${newDate}`,
        success: function (response) {
            if (response.media_type == "video") {
                $('#media').html(`<iframe id="videoLink" src="${response.url}" style="width: 90%; height: 400px"></iframe>`);

            } else {
                $('#media').html(`<img src="${response.url}" style="width: 100%; height: 100%; object-fit: contain">`);
            }
            $('#title').text(`Imagem do dia ${dateInput.val()}`);

            if (response.hasOwnProperty("copyright")) {
                $('#copyright').text(`By ${response.copyright}`);
            } else {
                $('#copyright').text("");
            }

            $('#imgTitle').text(response.title);
            $('#description').text(response.explanation);
            
        },
        error: function (erro) {
            $('#media').html(`<p>A data inserida precisa estar entre 16/06/1995 e a data de hoje!</p><img src="./assets/img/error404.svg" class="illustration">`);
            $('#title').empty()
            $('#imgTitle').empty();
            $('#copyright').empty();
            $('#description').empty();
        },
    });
})