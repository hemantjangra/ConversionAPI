var ConversionBox = React.createClass({

    getInitialState: function () {
        return {
            result: {},
            loading: false,
            firstNameValidation: "",
            amountValidation: "",
            negativeNumber:"",
            isEnabled:false,
            isNotNumber:""
        }
    },

    updateState(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var loadIcon = document.getElementById('loadingimage');
        var xhr = new XMLHttpRequest();
        var inputname = document.getElementById('inname').value;
        var inputamount = document.getElementById('inamount').value;
        if(this.validate()){
        xhr.open('POST', this.props.url, true);

        var params = JSON.stringify({ Name: inputname, Amount: inputamount });
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            this.setState({ result: response.Data.outPut, loading: false });

        }.bind(this);
        xhr.send(params);
        }
        else{
            if(inputname.length<=0){
                this.setState({firstNameValidation : "First Name Empty"});
                this.setState({amountValidation : ""});
                this.setState({negativeNumber : ""});
                this.setState({isNotNumber : ""});
            }
            if(inputamount.length<=0){
                this.setState({amountValidation : "Amount Field Empty"});
                this.setState({firstNameValidation : ""});
                this.setState({negativeNumber : ""});
                this.setState({isNotNumber : ""});
            }
            if(inputamount<=0){
                this.setState({negativeNumber : "Please enter a positive number"});
                this.setState({isNotNumber : ""});
                this.setState({firstNameValidation : ""});
                this.setState({amountValidation : ""});
            }
            if(inputamount != Number(inputamount)){
                this.setState({isNotNumber : "Please Enter Valid Amount"});
                this.setState({firstNameValidation : ""});
                this.setState({negativeNumber : ""});
                this.setState({amountValidation : ""});
            }           
        }
    },

    validate : function(){
        let inputname = document.getElementById('inname').value;
        let inputamount = document.getElementById('inamount').value;
        if(inputname.length>0 && inputamount.length>0 && inputamount == Number(inputamount) && inputamount>0){
            return true;
        }
        return false;
    },    

    handleNameChange(e){
        if(this.validate()){
            this.setState({isEnabled:true});
        }
        else{
            this.setState({isEnabled:false});
            let inputname = document.getElementById('inname').value;
            if(inputname.length<=0){
                this.setState({firstNameValidation : "Name Empty"});
            }
            else{
                this.setState({firstNameValidation : ""});
            }
        }
    },
    
    handleAmountChange: function(e){
        if(this.validate()){
             this.setState({isEnabled:true});
             this.setState({isNotNumber : ""});
             this.setState({negativeNumber : ""});
             this.setState({amountValidation : ""});
        }
        else{
            this.setState({isEnabled:false});
            let inputamount = document.getElementById('inamount').value;
            if(inputamount.length<=0){
                this.setState({amountValidation : "Amount Field Empty"});
                this.setState({negativeNumber : ""});
                this.setState({isNotNumber : ""});
            }
            else if(inputamount<=0){
                this.setState({negativeNumber : "Please enter a positive or Number Greater than Zero"});
                this.setState({isNotNumber : ""});
                this.setState({amountValidation : ""});
            }
            else if(inputamount !=Number(inputamount)){
                this.setState({isNotNumber : "Please Enter Valid Amount"});
                this.setState({negativeNumber : ""});
                this.setState({amountValidation : ""});
            }
            else if(typeof(parseInt(inputamount))=="number"){
                this.setState({isNotNumber : ""});
                this.setState({negativeNumber : ""});
                this.setState({amountValidation : ""});
            }
        }            
    },
    
    

    render: function () {

        const { result, loading } = this.state;

        return (
            <div className="commentBox">
                <div className="row allign-right">
                    <p> Input Values</p>
                    <div className="col-sm-4">
                        <label>Choose a Name: </label>
                        <input id="inname" type="textbox" onKeyUp={this.handleNameChange} />
                        <span className="validation-text">{this.state.firstNameValidation}</span>
                    </div>
                    <div className="col-sm-8">
                        <label>Choose Amount: </label>
                        <input id="inamount" type="textbox" onKeyUp={this.handleAmountChange} />
                        <span className="validation-text">{this.state.amountValidation}</span>
                        <span className="validation-text">{this.state.negativeNumber}</span>
                        <span className="validation-text">{this.state.isNotNumber}</span>
                    </div>
                    <div className="col-sm-8">
                        <button className=" allign-middle" id="convertBtn" value="Convert me to Alphabets" disabled={!this.state.isEnabled} onClick={this.updateState}> Convert me to Alphabets </button>
                    </div>
                </div>
                <div className="row allign-right">
                    <p> Output Values</p>
                    <div className="col-sm-4">
                        <label id="outName">Name: {this.state.result.Name}</label>
                    </div>
                    <div className="col-sm-8">
                        <label id="outamount">Converted Amount: {this.state.result.Amount}</label>
                    </div>
                    {loading ? (<p>Loading...</p>) : null}
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <ConversionBox url="/api/conversion/ConvertNumtoAlpha" />,
    document.getElementById('content')
);