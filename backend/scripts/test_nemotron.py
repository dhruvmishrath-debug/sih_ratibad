from transformers import AutoTokenizer, AutoModelForCausalLM

def run_nemotron_model():
    print("Loading tokenizer and model...")
    # Initialize the tokenizer
    tokenizer = AutoTokenizer.from_pretrained(
        "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8", 
        trust_remote_code=True
    )
    
    # Initialize the model (Warning: This requires significant VRAM, e.g., multiple A100s)
    model = AutoModelForCausalLM.from_pretrained(
        "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8", 
        trust_remote_code=True, 
        device_map="auto"
    )
    
    messages = [
        {"role": "user", "content": "Who are you?"},
    ]
    
    print("Formatting inputs...")
    inputs = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        tokenize=True,
        return_dict=True,
        return_tensors="pt",
    ).to(model.device)

    print("Generating response...")
    outputs = model.generate(**inputs, max_new_tokens=40)
    
    response = tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:])
    print("\nModel Response:")
    print(response)

if __name__ == "__main__":
    run_nemotron_model()
