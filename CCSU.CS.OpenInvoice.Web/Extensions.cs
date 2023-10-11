﻿

using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CCSU.CS.OpenInvoice.Web
{
    static class Extensions
    {

        public static string GetFullErrorMessage(this ModelStateDictionary modelState)
        {
            var messages = new List<string>();

            foreach (var entry in modelState)
            {
                foreach (var error in entry.Value.Errors)
                    messages.Add(error.ErrorMessage);
            }

            return String.Join(" ", messages);
        }

    }
}
