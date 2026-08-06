import json

from app.parsers.base_parser import BaseParser


class JSONParser(BaseParser):

    def parse(self, file_path: str):

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            data = json.load(file)

        if isinstance(data, list):
            return data

        return [data]