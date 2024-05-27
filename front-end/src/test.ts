# Training and evaluation of models
models = {
    "Decision Tree": DecisionTreeClassifier(),
    "Random Forest": RandomForestClassifier(),
    "Light GBM": LGBMClassifier()
}
for model_name, model in models.items():
train_and_evaluate_model(model, model_name)