import numpy as np

def preprocess_input(data, features, encoders=None, scaler=None):
    """
    Preprocesses input data for prediction.
    :param data: Dictionary of input values.
    :param features: List of feature names in order.
    :param encoders: Dictionary of encoders for categorical features.
    :param scaler: Scaler object to transform the data.
    :return: Preprocessed numpy array.
    """
    input_list = []
    
    for feature in features:
        value = data.get(feature)
        
        # Handle categorical encoding
        if encoders and feature in encoders:
            encoder = encoders[feature]
            try:
                # Try to transform, fallback to default if unseen label
                value = encoder.transform([str(value)])[0]
            except:
                # Simple fallback logic: 0 or 1 based on common binary cases
                # Ideally, we should handle this more robustly or return an error
                if str(value).lower() in ['male', 'yes', '1']:
                    value = 1
                else:
                    value = 0
        
        # Ensure numeric
        try:
            value = float(value)
        except:
            value = 0.0
            
        input_list.append(value)
        
    input_array = np.array([input_list])
    
    if scaler:
        input_array = scaler.transform(input_array)
        
    return input_array
