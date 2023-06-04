using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAuthorization.Data.Migrations
{
    public partial class AGAIN : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "BookMarks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BookMarkUser",
                columns: table => new
                {
                    BookMarksId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookMarkUser", x => new { x.BookMarksId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_BookMarkUser_BookMarks_BookMarksId",
                        column: x => x.BookMarksId,
                        principalTable: "BookMarks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookMarkUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookMarkUser_UsersId",
                table: "BookMarkUser",
                column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookMarkUser");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BookMarks");
        }
    }
}
