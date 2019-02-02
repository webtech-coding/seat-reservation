class SeatSelection{
    constructor(){
        //GET ALL SELECTABLE SEATS
        this.seats=document.querySelectorAll('.column__seat')
        this.table=document.querySelector('.calculation__tbody')
        this.checkOutButton=document.querySelector('.calculation__button')

        //ADD SELECT EVENT
        this.selectEvent()

        this.selection=[]
        this.totalPrice=0

    }

    selectEvent(){
        let seatObject={}
        this.seats.forEach(seat=>{
            if(!seat.classList.contains('column__seat--reserved')){
                seat.addEventListener('click',()=>{
                    if(!seat.classList.contains('column__seat--selection')){
                        seat.classList.add('column__seat--selection')
                        seatObject['seat']=seat.getAttribute('data-seat')
                        seatObject['price']=seat.getAttribute('data-price')
                        this.selection.push(seatObject)
                        seatObject={}
                    }else{
                        seat.classList.remove('column__seat--selection')
                        this.selection=this.selection.filter(selectedSeats=>{
                           return selectedSeats['seat']!=seat.getAttribute('data-seat')
                        })
                    }
                    this.refreshSelection()
                })
            }
        })
    }

    refreshSelection(){
        let index=0
        let totalPrice=0
        this.table.innerHTML=''
        if(this.selection.length>0){
            this.checkOutButton.classList.remove('calculation__button--disable')
        }else{
            this.checkOutButton.classList.add('calculation__button--disable')
        }
        

        this.selection.forEach(seat=>{
            index++
            
            let tr=document.createElement('tr')

            let rowIndex=document.createElement('td')
            rowIndex.textContent=index

            let seatIndex=document.createElement('td')
            seatIndex.textContent=seat['seat'].split('_')[0]+' '+seat['seat'].split('_')[1]

            let price=document.createElement('td')
            price.textContent=seat['price']

            totalPrice+=parseInt(seat['price'])

            tr.appendChild(rowIndex)
            tr.appendChild(seatIndex)
            tr.appendChild(price)
            this.table.appendChild(tr)
        })

        let total=document.createElement('tr')

        let td_1=document.createElement('td')
        let td_2=document.createElement('td')
        let td_3=document.createElement('td')
        td_3.innerHTML="<strong>TOTAL : "+totalPrice+" € </strong>"
        total.appendChild(td_1)
        total.appendChild(td_2)
        total.appendChild(td_3)
        
        this.table.appendChild(total)
    }
}

new SeatSelection()