import os

from app.parsers.parser_factory import ParserFactory


def parse_uploaded_file(
    file_path: str
):

    extension = os.path.splitext(
        file_path
    )[1].replace(".", "")

    parser = ParserFactory.get_parser(
        extension
    )

    return parser.parse(file_path)