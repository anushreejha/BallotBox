import os

def save_file(file, directory='uploads/'):
    if not os.path.exists(directory):
        os.makedirs(directory)
    file_path = os.path.join(directory, file.filename)
    file.save(file_path)
    return file_path
