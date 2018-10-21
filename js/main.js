const width = 600;
const height = 400;

const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

const profileListing = svg.append('g');

const buttons = d3.selectAll('input');

d3.csv('data/bts-profiles.csv').then((data) => {
    buttons.on('change', function(d){
        let memberName = this.value;
        showImage(memberName);
        showData(memberName, data);
    });

});


function showImage(memberName){
    let imageFile;
    if(memberName == "Kim Namjoon"){
        imageFile = 'assets/rm.png';
    }
    else if(memberName == "Kim Seokjin"){
        imageFile = 'assets/jin.png';
    }
    else if(memberName == "Park Jimin"){
        imageFile = 'assets/jimin.png';
    }
    else if(memberName == "Jeon Jeong-guk"){
        imageFile = 'assets/jungkook.png';
    }
    else if(memberName == "Min Yoongi"){
        imageFile = 'assets/suga.png';
    }
    else if(memberName == "Jung Hoseok"){
        imageFile = 'assets/jhope.png';
    }
    else if(memberName == "Kim Taehyung"){
        imageFile = 'assets/v.png';
    }

    const images = svg.selectAll('image')
        .data([imageFile]);
    
    images 
        .exit().remove();

    images
        .attr('xlink:href', d => d)
        .attr('x', '0')
        .attr('y', '100')
        .attr('width', '150')
        .attr('height', '150')
        .attr('opacity', '0.1')
        .transition()
        .attr('x', '300')
        .attr('opacity', '1.0')
        .duration(700);

    images.enter()
        .append('image')
        .attr('xlink:href', d => d)
        .attr('x', '0')
        .attr('y', '100')
        .attr('width', '150')
        .attr('height', '150')
        .attr('opacity', '0.1')
        .transition()
        .attr('x', '300')
        .attr('opacity', '1.0')
        .duration(700);

}

function showData(memberName, data){
    profileListing.selectAll('text').remove();
    data.forEach((element) => {
        if(element.name == memberName){
            var yPosition = 80;
            for( var memberInfo in element){
                let memberValue = element[memberInfo];
                profileListing
                    .append('text')
                    .attr('x', '50')
                    .attr('y', yPosition)
                    .text(`${memberInfo}: ${memberValue}`);
                    yPosition += 50;
            }
        }
    })
}
