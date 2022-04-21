$(function () {
    const qData = [{
            qNumber: 1,
            qTitle: 'سوال ۱',
            options: [{
                    id: 'o1',
                    data: 'گزینه۱',
                    isAnswer: true,
                },
                {
                    id: 'o2',
                    data: 'گزینه۲',
                    isAnswer: false,
                    help: 'نزدیک شدی',
                },
                {
                    id: 'o3',
                    data: 'گزینه۳',
                    isAnswer: false,
                    help: 'هرعدد فردی که ۳ نیست',
                },
                {
                    id: 'o4',
                    data: 'گزینه۴',
                    isAnswer: false,
                    help: 'گزینه فرده',
                },
            ]
        },
    ]


    $('main').attr('question_number', 1)
    dataFiller(qData, 1);

    //checking the answer
    $('#next').on('click', function () {
        var currentAswer = $('input[type=radio]:checked').val() //getting answer value

        $(qData[Number($('main').attr('question_number') - 1)].options).each(function (index) {
            if (this.data === currentAswer && !this.isAnswer) {
                //what happens if the answer is wrong
                help(this.help)
            } else if (this.data === currentAswer && this.isAnswer) {
                //what happent if answer is right
                chear()

                setTimeout(function(){
                    $('main').attr('question_number', Number($('main').attr('question_number')) + 1)
                    dataFiller(qData, $('main').attr('question_number'))
                },2000)
            }
        })
    })
})

function help(tip) {
    $('#tip').text(`راهنمایی: ${tip}`);
    $('#tip').removeClass('hidden');
    if (!$('body').hasClass('error')) {
        $('body').addClass('error');
    }
}

function chear() {

    if ($('body').hasClass('error')) {
        $('body').removeClass('error');
        $('body').addClass('success');
        $('#tip').addClass('hidden');
    } else if (!$('body').hasClass('error')) {
        $('body').addClass('success');
        $('#tip').removeClass('hidden');
        $('#tip').text('بدون اشتباه 😎');
    }
}

function dataFiller(qData, qNumber) {
    styleFixer()
    $('#question-title').text(qData[qNumber - 1].qTitle); //filling question title
    $('#options-container').html('')
    //filling question options
    $(qData[qNumber - 1].options).each(function () {
        var optionData = (
            `<li><label for="${this.id}">${this.data}</label><input type="radio" name="answer" id="${this.id}" value="${this.data}"></li>`
        )
        $('#options-container').append(optionData)
    })
}

function styleFixer(){
    $('body').removeClass('success');
    $('#tip').addClass('hidden')
}
