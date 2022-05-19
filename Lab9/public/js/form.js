(function (){
    function primeCheck(num){
        let retVal = true;
        if(typeof num != 'number'){
            throw "ERROR: Input must be a number!";
        }
        if(num < 0){
            throw "ERROR: Input must be non-negative!";
        }
        if(num === 1){
            throw "ERROR: 1 is not prime nor composite!";
        }
        if(num === 0){
            throw "ERROR: 0 is not prime nor composite!";
        }
        if(!num){
            throw "ERROR: You must input a value!";
        }
        for(let i = 2; i < num; i++){
            if(num % i === 0){
                retVal = false;
                break;
            }
        }
        return retVal;
    }

    const primeForm = document.getElementById('prime-form');

    if(primeForm){
        const input = document.getElementById('input');
        const errorContainer = document.getElementById('error-container');
        const errorTextElement = errorContainer.getElementsByClassName('text-goes-here')[0];
        const attemptsList = document.getElementById('attempts');

        primeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            try{
                errorContainer.classList.add('hidden');

                const inputVal = input.value;
                const parsedInput = parseInt(inputVal);
                const isPrime = primeCheck(parsedInput);

                let attempt = document.createElement('li');
                
                if(isPrime){
                    attempt.innerHTML = parsedInput + " is a prime number";
                    attempt.className = "is-prime";
                    attemptsList.appendChild(attempt);
                }
                else{
                    attempt.innerHTML = parsedInput + " is NOT a prime number";
                    attempt.className = "not-prime";
                    attemptsList.appendChild(attempt);
                }  
            } catch (e) {
                const message = typeof e === 'string' ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove('hidden');
            }
        });
    }
})();